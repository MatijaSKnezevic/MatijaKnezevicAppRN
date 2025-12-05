import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import {Redirect, useRouter} from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function LoginScreen() {
    const router = useRouter();
    const { signIn, session } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if(session) {
        return <Redirect href={"/(tabs)"}/>
    }

    const handleLogin = async () => {
        const { error } = await signIn(email, password);
        if (!error) router.replace("/(tabs)");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome back 👋</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#9ca3af"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#9ca3af"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/signup")}>
                <Text style={styles.link}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", padding: 25
    },
    title: { fontSize: 28,
        fontWeight: "bold",
        marginBottom: 6
    },
    subtitle: { fontSize: 16,
        color: "#6b7280",
        marginBottom: 30 },
    form: {
        width: "100%",
        gap: 15
    },
    input: {
        backgroundColor: "#f3f4f6",
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
    },
    button: {
        width: "100%",
        backgroundColor: "#2563eb",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 20
    },
    buttonText: { color: "#fff",
        fontSize: 17,
        fontWeight: "600" },
    link: {

        color: "#2563eb",
        fontSize: 15,
        fontWeight: "500"
    },
});
