import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {SafeAreaView} from "react-native-safe-area-context";

export default function TaskDetail() {
    const { id, change } = useLocalSearchParams();
    const router = useRouter();

    const [task, setTask] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(change){
            fetchTask()
        }
    }, []);

    const handleDelete = async () => {
        const deleteTask = await supabase
            .from('tasks')
            .delete()
            .eq('id', id)

            router.push('/(tabs)?refresh=true')
    }

    const fetchTask = async () => {
        const { data } = await supabase
            .from("tasks")
            .select("*")
            .eq("id", id)
            .single();

        setTask(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchTask();
    }, []);

    if (loading) return <ActivityIndicator size="large" style={{marginTop:50}} />;




    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerText}>
                <View style={styles.card}>
            <Text style={styles.cardTitle}>{task.title}</Text>
                </View>
                <View style={styles.cardDesc}>
            <Text style={styles.desc}>{task.description || "No description provided"}</Text>
                </View>
            <Text style={styles.date}>
                Created: {new Date(task.created_at).toLocaleDateString()}
            </Text>

            </View>
          <View style={styles.containerBtn}>
            <TouchableOpacity
                style={[styles.button, {backgroundColor: task.completed ? "#16a34a" : "#2563eb"}]}
                onPress={async () => {
                    await supabase
                        .from("tasks")
                        .update({ completed: !task.completed })
                        .eq("id", id);
                    fetchTask();
                }}
            >
                <Text style={styles.btnText}>
                    {task.completed ? "Mark as Uncomplete" : "Mark as Complete"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, {backgroundColor: "#16a99d"}]}
                onPress={()=> router.push(`/edit/${id}`)}
            >
                <Text style={styles.btnText}>
                    Edit task
                </Text>
            </TouchableOpacity>
        <TouchableOpacity
            style = {styles.deleteButton}
            onPress = { handleDelete }
        >
            <Text style={styles.btnText}>
                Delete task
            </Text>
        </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push(`/(tabs)?${task.completed}`)} style={styles.backButton}>

                <Text style={{textAlign:"center"}}>← Back</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{flex:1,padding:25,backgroundColor:"#fff", justifyContent:"space-between"},
    desc:{fontSize:16,opacity:0.8,marginBottom:10, height:"40%"},
    date:{fontSize:14,opacity:0.6,marginBottom:25},

    card:{
        backgroundColor:"#e5e7eb",
        padding:15,
        borderRadius:10,
        marginBottom:10,
    },
    cardDesc:{
        backgroundColor:"#e5e7eb",
        opacity: 0.5,
        padding:15,
        borderRadius:10,
        marginBottom:10
    },
    cardTitle:{ fontSize:18, fontWeight:"600" },

    containerText:{flex:1},
    containerBtn:{flex:1, justifyContent:"flex-end", marginBottom:20},
    button:{
        padding:14,
        borderRadius:10,
        alignItems:"center",
        marginBottom:15,
    },
    btnText:{
        color:"#fff",
        fontSize:16,
        fontWeight:"600"
    },

    deleteButton: {
        backgroundColor: "#ef9999",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    backButton: {
        height:50,
        marginTop: 50,
        backgroundColor: "#959595",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
    },

});
