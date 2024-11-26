/* eslint-disable no-undef */
import prisma from '@repo/db/client'
import { signinInput } from '@/zod/validateUser';
import bcrypt from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWTPayload, SignJWT, importJWK } from 'jose';


const generateJWT = async (payload: JWTPayload) => {
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    const secret = process.env.JWT_SECRET || 'secret';
  
    const jwk = await importJWK({ k: secret, alg: 'HS256', kty: 'oct' });
  
    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('365d')
      .sign(jwk);
  
    return jwt;
  };
  

export const NEXT_AUTH_CONFIG = {
    providers: [
      CredentialsProvider({
          name: "credentials",
          credentials: {},
          async authorize(credentials: any) {
              const {email, password} = credentials;
              const signSuccess = signinInput.safeParse({email, password})
              if(!signSuccess){
                return null;
              }
              try {
                const admin = await prisma.admin.findFirst({
                  where: {
                    email
                  },
                  select: {
                    adminId: true,
                    adminName: true,
                    email: true,
                    password: true,
                    image: true,
                    mobile: true
                  }
                });


                
                if(!admin || !await bcrypt.compare(password, admin.password)){
                  return null;
                }
                const jwt = await generateJWT({
                    id: admin.adminId,
                });
                await prisma.admin.update({
                    where: {
                        adminId: admin.adminId
                    },
                    data: {
                        token: jwt
                    }
                })
                return {
                  id: admin.adminId,
                  name: admin.adminName,
                  email: admin.email,
                  image: admin.image,
                  mobile: admin.mobile,
                  token: jwt
                }
              } catch (error) {
                return null;
              } 
          },
        }),
    ],
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ user, token }: any) => {
        if (user) {
            token.uid = user.id;
            token.jwtToken = user.token;
            token.mobile = user.mobile;
        }
        return token;
      },
      // eslint-disable-next-line no-unused-vars
      session: ({ session, token, user }: any) => {
          if (session.user) {
              session.user.id = token.uid;
              session.user.mobile = token.mobile;
          }
          return session
      }
    },
    pages: {
      signIn: '/login'
    }
    
  }