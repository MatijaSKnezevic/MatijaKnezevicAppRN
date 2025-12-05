import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

export default function SignupScreen() {
    const router = useRouter();
    const { signUp } = useAuth();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup =() => {
         signUp(email, password, firstName, lastName);

         router.push("/");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account ✍️</Text>
            <Text style={styles.subtitle}>Fill your info to register</Text>

            <View style={styles.form}>

                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor="#9ca3af"
                    value={firstName}
                    onChangeText={setFirstName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="#9ca3af"
                    value={lastName}
                    onChangeText={setLastName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#9ca3af"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
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

            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.link}>Already have an account? Log in</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 25
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 8

    },
    subtitle: {
        fontSize: 16,
        color: "#6b7280",
        marginBottom: 30
    },
    form: {
        width: "100%",
        gap: 15 },
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
    buttonText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "600"
    },
    link: {
        color: "#2563eb",
        fontSize: 15,
        fontWeight: "500"
    },
});
