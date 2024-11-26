import { Admin } from "@/components/orders/OrderCard"
import { useEffect, useState } from "react"

export const useAdmins = () => {
    const [admins, setAdmins] = useState<Admin[]>([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true);
        fetch("/api/fetch-admins", {method: "GET"}).then((response) => {
            if(response.ok){
                response.json().then((json) => {
                    setAdmins(json.admins)
                })
            }
        });
        setLoading(false);
    }, [])

    return {admins, loading}
}