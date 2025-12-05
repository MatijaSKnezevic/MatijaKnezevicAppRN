import {View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Modal, Image} from "react-native";
import { useUser } from "@/hooks/useUser";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import {SafeAreaView} from "react-native-safe-area-context";

export default function ProfileScreen() {
    const { user, loading, fetchUser, updateUser } = useUser();
    const { session } = useAuth();

    const [modalVisible, setModalVisible] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        if (user) {
            setFirstName(user.first_name || "");
            setLastName(user.last_name || "");
        }
    }, [user]);

    const handleSave = async () => {
        await updateUser(firstName, lastName);
        await fetchUser();
        setModalVisible(false)
    };

    if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

    return (
        <SafeAreaView style={styles.container}>

            <Image
                source={{ uri: `https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=random` }}
                style={{ width:100, height:100, borderRadius:50 }}
            />
            {/*<View style={[styles.avatar, {backgroundColor: "#b60724"}]}>*/}
            {/*    <Text style={{ fontSize:40, color:"#fff" }}>{firstName.slice(0,1)}</Text>*/}
            {/*</View>*/}

            <Text style={styles.name}>{user.first_name} {user.last_name}</Text>

            <View style={styles.infoBox}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.infoText}>{user.email}</Text>
            </View>
            <TouchableOpacity style={styles.editBtn} onPress={() => setModalVisible(true)}>
                <Text style={styles.editText}>Edit Profile</Text>
            </TouchableOpacity>


            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalBackground}>
                    <View style={styles.modalCard}>

                        <Text style={styles.modalTitle}>Edit Profile</Text>

                        <TextInput
                            style={styles.input}
                            value={firstName}
                            onChangeText={setFirstName}
                            placeholder="First Name"
                        />

                        <TextInput
                            style={styles.input}
                            value={lastName}
                            onChangeText={setLastName}
                            placeholder="Last Name"
                        />

                        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                            <Text style={styles.saveBtnText}>Save changes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={{ textAlign:"center", marginTop:12 }}>Cancel</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        paddingBottom:10,
        backgroundColor:"#fff" },

    avatar:{
        width:100,
        height:100,
        borderRadius:999,
        backgroundColor:"#e5e7eb",
        alignItems:"center",
        justifyContent:"center",
        marginBottom:15,
    },

    name:{
        fontSize:24,
        fontWeight:"700",
        marginBottom:20 },

    infoBox:{
        backgroundColor:"#f3f4f6",
        padding:14,
        borderRadius:12,
        width:"85%",
        marginBottom:25,
        alignItems:"center"
    },

    label:{
        fontSize:14,
        color:"#6b7280"
    },
    infoText:{
        fontSize:16,
        fontWeight:"500"
    },

    editBtn:{
        backgroundColor:"#2563eb",
        padding:14,
        borderRadius:10,
        width:"70%",
        alignItems:"center" },
    editText:{
        color:"#fff",
        fontSize:16,
        fontWeight:"600"
    },

    // MODAL ----------
    modalBackground:{ flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"rgba(0,0,0,0.4)" },
    modalCard:{ width:"85%", backgroundColor:"#fff", padding:25, borderRadius:15 },

    modalTitle:{ fontSize:22, fontWeight:"700", marginBottom:20 },

    input:{ backgroundColor:"#eee", padding:12, borderRadius:10, marginBottom:12 },

    saveBtn:{ backgroundColor:"#2563eb", padding:14, borderRadius:10, alignItems:"center", marginTop:5 },
    saveBtnText:{ color:"#fff", fontSize:16, fontWeight:"600" },
});
