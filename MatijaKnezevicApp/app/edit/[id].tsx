import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import {SafeAreaView} from "react-native-safe-area-context";

export default function EditTask() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [loading, setLoading] = useState(true);


    const fetchTask = async () => {
        const { data, error } = await supabase
            .from("tasks")
            .select("*")
            .eq("id", id)
            .single();

        if (!error && data) {
            setTitle(data.title);
            setDesc(data.description || "");
        }

        setLoading(false);
    };

    useEffect(() => { fetchTask(); }, []);

    const handleSave = async () => {
        const {data, error} = await supabase
            .from("tasks")
            .update({ title: title, description: desc })
            .eq("id", id)
            .select("*");

        router.push(`/task/${id}?change=true`);
    };

    if (loading) return <ActivityIndicator size="large" style={{marginTop:50}} />;

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Edit Task</Text>

            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Task title"
            />

            <TextInput
                style={styles.input}
                value={desc}
                onChangeText={setDesc}
                placeholder="Description"
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.back()}>
                <Text style={{textAlign:"center", marginTop:12}}>Cancel</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{flex:1,padding:25,backgroundColor:"#fff"},
    header:{fontSize:24,fontWeight:"bold",marginBottom:25},
    input:{backgroundColor:"#eee",padding:14,borderRadius:10,marginBottom:15,fontSize:16},
    saveButton:{backgroundColor:"#2563eb",padding:15,borderRadius:10,alignItems:"center",marginTop:10},
    saveText:{color:"#fff",fontSize:16,fontWeight:"600"}
});
