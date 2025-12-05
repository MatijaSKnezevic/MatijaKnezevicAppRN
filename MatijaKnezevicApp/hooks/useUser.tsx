import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

export function useUser() {
    const { session } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = useCallback(async () => {
        if (!session?.user?.id) return;

        setLoading(true);

        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", session.user.id)
            .single();

        if (!error) setUser(data);
        setLoading(false);
        return data;
    }, [session?.user?.id]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);


    const updateUser = async (firstName: string, lastName:string) => {
        const { error } = await supabase
            .from("users")
            .update({
                first_name: firstName,
                last_name: lastName,
            })
            .eq("id", session?.user?.id);

        if (!error) {
            await fetchUser();
            alert("Profil uspesno izmenjen");
        } else {
            alert("Greska");
        }
    }


    return { user, loading, fetchUser, updateUser };
}
