import {Button, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useAuth} from "@/context/AuthContext";
import {Redirect, useRouter} from "expo-router";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";



const WelcomeScreen = () => {

    const {session} = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkFirstOpen = async () => {

            const alreadyOpened = await AsyncStorage.getItem("welcomeScreenSeen");

            if(alreadyOpened){
                if(session) return router.replace("/(tabs)");
                return router.replace("/login");
            }
            setLoading(false);

        }
        checkFirstOpen();
    }, [session]);


    const handleButtonStart = async () => {
        await AsyncStorage.setItem("welcomeScreenSeen", "true");

        router.replace("/login");
    }

    if (loading) return <ActivityIndicator size="large" style={{marginTop: 50}} />;
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Welcome 👋</Text>
            <Text style={styles.subtitle}>Thanks for installing the app!</Text>
            <Text style={styles.subtitle}>Lets help you manage your tasks smarter.</Text>

            <TouchableOpacity style={styles.button} onPress={handleButtonStart}>
                <Text style={styles.buttonText}>Get Started →</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {flex:1, justifyContent:"center", alignItems:"center", padding:30, backgroundColor:"#fff"},
    title: {fontSize:32, fontWeight:"900", marginBottom:10},
    subtitle: {fontSize:16, color:"#6b6b6b", textAlign:"center", marginBottom:6},
    button: {marginTop:25, backgroundColor:"#2563eb", paddingVertical:12, paddingHorizontal:30, borderRadius:10},
    buttonText: {color:"#fff", fontSize:18, fontWeight:"600"},
});

export default WelcomeScreen;