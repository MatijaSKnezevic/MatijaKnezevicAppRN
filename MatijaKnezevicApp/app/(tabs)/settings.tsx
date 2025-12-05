import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Switch } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/AuthContext";
import { useThemeColors } from "@/context/ThemeContext";
import { router } from "expo-router";

export default function SettingsScreen() {
    const { signOut, session } = useAuth();
    const { theme, toggleTheme, colors } = useThemeColors();

    const handleLogout = async () => {

        Alert.alert("Log Out:", "This action is logged out.");
        await signOut();
        router.replace("/login");
    };

       // za reset potpuni proveru da li welcome radi dobro
        const handleReset = async () => {

            Alert.alert("Reset App:", "This will erase all local data and log you out")

          await signOut();
          await AsyncStorage.clear();
          router.replace("/welcome");
        }


    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>

            <Text style={[styles.title, { color: colors.textPrimary }]}>Settings ⚙</Text>


            <View style={styles.row}>
                <Text style={[styles.label, { color: colors.textPrimary }]}>Dark Mode</Text>
                <Switch value={theme === "dark"} onValueChange={toggleTheme} />
            </View>


            <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>


            <TouchableOpacity style={[styles.deleteBtn]} onPress={handleReset}>
                <Text style={styles.deleteText}>Reset App (Clear Data)</Text>
            </TouchableOpacity>


            <View style={styles.userBox}>
                <Text style={{ fontSize: 14, color: colors.textSecondary }}>Logged in as:</Text>
                <Text style={{ fontSize: 16, fontWeight: "600", color: colors.textPrimary }}>
                    {session?.user?.email}
                </Text>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex:1, padding:25 },
    title:{ fontSize:26, fontWeight:"bold", marginBottom:25 },

    row:{ flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginBottom:20 },
    label:{ fontSize:18 },

    button:{ padding:15, borderRadius:10, alignItems:"center", marginTop:10 },
    buttonText:{ color:"#fff", fontSize:16, fontWeight:"600" },

    deleteBtn:{ marginTop:15, padding:14, backgroundColor:"#ef4444", borderRadius:10, alignItems:"center" },
    deleteText:{ color:"#fff", fontSize:16, fontWeight:"600" },

    userBox:{
        marginTop:"auto", padding:14, borderRadius:10, backgroundColor:"#f2f2f2", alignItems:"center"
    }
});