import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import {useTasks} from "@/hooks/useTask";
import {SafeAreaView} from "react-native-safe-area-context";

export default function AddTask() {
    const router = useRouter();
    const { session } = useAuth();
    const {fetchTasks} = useTasks();

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const handleAdd = async () => {
        if (!title.trim()) return alert("Task must have a name!");

        await supabase.from("tasks").insert({
            user_id: session?.user.id,
            title: title,
            description: desc,
            completed: false,
        });

        router.push("/(tabs)?refresh=true");
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Add Task</Text>

            <TextInput
                style={styles.input}
                placeholder="Task title"
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                style={styles.input}
                placeholder="Description (optional)"
                value={desc}
                onChangeText={setDesc}
            />

            <TouchableOpacity style={styles.button} onPress={handleAdd}>
                <Text style={styles.buttonText}>Save Task</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.back()}>
                <Text style={{textAlign:"center", marginTop:10}}>Cancel</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {flex:1, padding:25, backgroundColor:"#fff"},
    header: {fontSize:24, fontWeight:"bold", marginBottom:25},
    input:{
        backgroundColor:"#eee",
        padding:14,
        borderRadius:10,
        marginBottom:15,
        fontSize:16,
    },
    button:{
        backgroundColor:"#2563eb",
        padding:15,
        borderRadius:10,
        alignItems:"center",
        marginTop:10,
    },
    buttonText:{color:"#fff", fontSize:16, fontWeight:"600"}
});
