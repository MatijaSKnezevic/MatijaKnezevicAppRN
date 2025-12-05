import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

export function useTasks() {
    const { session } = useAuth();
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = useCallback(async () => {
        if (!session?.user?.id) return;

        setLoading(true);
        const { data, error } = await supabase
            .from("tasks")
            .select("*")
            .eq("user_id", session.user.id)
            .order("created_at", { ascending: false });

        if (!error) setTasks(data || []);
        setLoading(false);
    }, [session?.user?.id]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    return { tasks, loading, fetchTasks };
}
