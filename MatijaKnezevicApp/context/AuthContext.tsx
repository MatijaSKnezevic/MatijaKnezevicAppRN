import {View} from "react-native";
import React, {createContext, useCallback, useContext, useEffect, useState} from "react";
import {supabase} from "@/lib/supabase";
import {Session} from "@supabase/auth-js";


type AuthContextType = {
    signOut: () => Promise<void>;
    signUp: (email: string, password:string, firstName: string, lastName: string) => Promise<{ error?: string }>;
    signIn: (email: string, password:string) => Promise<{ error?: string }>;
    session: Session | null;
    loading: boolean;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default function AuthProvider({children}: {children: React.ReactNode}) {


    const [loading, setLoading] = useState(true);

    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        console.log("session", session);
        supabase.auth.getSession().then(({data: {session}}) =>
        {
            setSession(session);
            setLoading(false);
        })

        const {data: {subscription}} = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession);
        })
        return () => {
            subscription.unsubscribe();
        }
    }, []);


    const signOut:  () => Promise<void> = useCallback(async () => {
        await supabase.auth.signOut();
        setSession(null);
    }, [])

    const signUp: AuthContextType['signUp']  = async (email, password, firstName,lastName) => {

        const {data, error} = await supabase.auth.signUp({
            email,
            password
        })

        const {data: userData, error: userError} = await supabase
            .from('users')
            .insert({
                id: data?.user?.id,
                email: data?.user?.email,
                first_name: firstName,
                last_name: lastName,
            })
        console.log(firstName, lastName)
        console.log("Novi ulogovani korisnik"+data)
        console.log(userData)
        console.log(userError)
        return {error: error?.message || userError?.message};
    };

    const signIn: AuthContextType['signIn'] = async (email: string, password: string) => {

        const {error} = await supabase.auth.signInWithPassword({
            email,
            password
        })
        return {error: error?.message};


    }



    return (
        <AuthContext.Provider value={{signOut, signUp, signIn, session, loading}}>{children}</AuthContext.Provider>
    )
}
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};