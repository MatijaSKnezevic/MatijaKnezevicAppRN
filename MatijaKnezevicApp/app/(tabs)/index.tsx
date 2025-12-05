import {View, Text, FlatList, TouchableOpacity, ActivityIndicator, TextInput, StyleSheet} from "react-native";
import {Redirect, useLocalSearchParams, useRouter} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {useAuth} from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useTasks} from "@/hooks/useTask";
import {useEffect, useMemo, useState} from "react";

export default function Home() {
  const router = useRouter();
  const {signOut} = useAuth()
    const {loading, fetchTasks, tasks} = useTasks();
  const [search, setSearch] = useState("");
  const [filterTasks, setFilter] = useState<"all" | "active" | "completed">("all");

  const filteredTasks = useMemo(() => {
      return tasks
      .filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase()))
      .filter (t =>
            filterTasks === 'all' ? true:
            filterTasks === 'active' ? !t.completed:
            filterTasks === 'completed' ? t.completed : true
          )


      }, [tasks, filterTasks, search]);



    const params = useLocalSearchParams();

    useEffect(() => {
        if (params.refresh || params.completed){
            fetchTasks();
        }
    }, []);

    const handleSignOut = async () => {
      await signOut();
      router.replace("/welcome");
    }


    return (
      <SafeAreaView style={styles.container}>


          <Text style={styles.title}>
              My Tasks
          </Text>

              <TextInput
                style={styles.search}
                placeholder="Search..."
                value={search}
                onChangeText={setSearch}

              />

          <View style={styles.filterRow}>
              <FilterButton  text="All" active={filterTasks==="all"} onPress={()=>setFilter("all") }/>
              <FilterButton  text="Active" active={filterTasks==="active"} onPress={()=>setFilter("active") }/>
              <FilterButton  text="Completed" active={filterTasks==="completed"} onPress={()=>setFilter("completed") }/>
          </View>

          {loading ? (
              <ActivityIndicator size="large" style={{ marginTop: 30 }} />
          ) : (
              <FlatList
                  data={filteredTasks}
                  keyExtractor={(item) => item.id}
                  onRefresh={fetchTasks}
                  refreshing={loading}
                  ListEmptyComponent={<Text style={styles.emptyComponent}>There's no more tasks</Text>}
                  renderItem={({ item }) => (
                      <TouchableOpacity
                          style={styles.card}
                          onPress={() => router.push(`/task/${item.id}`)}
                      >
                          <Text style={styles.cardTitle}>{item.title}</Text>
                          {item.completed && <Text style={{ color: "green" }}>Completed ✔</Text>}
                      </TouchableOpacity>
                  )}
              />
          )}


          <TouchableOpacity
              onPress={() => router.push("/modal-add-task")}
              style={styles.addBtn}
          >
              <Text style={styles.addText}>+</Text>
          </TouchableOpacity>

      </SafeAreaView>
    );
}

function FilterButton({ text, active, onPress }:any) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.filterBtn, active && styles.filterActive]}>
            <Text style={[styles.filterText, active && styles.filterTextActive]}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{ flex:1, padding:20 },
    title:{ fontSize:26, fontWeight:"bold", marginBottom:10 },

    search:{
        borderWidth:1,
        borderColor:"#ccc",
        borderRadius:10,
        padding:12,
        marginBottom:12,
        fontSize:16
    },
    emptyComponent: {
        opacity:0.6, textAlign:"center", marginTop:30
    },
    card:{
        backgroundColor:"#e5e7eb",
        padding:15,
        borderRadius:10,
        marginBottom:10
    },
    cardTitle:{ fontSize:18, fontWeight:"600" },
    done:{ color:"green", marginTop:2 },

    addBtn:{
        position:"absolute", right:20, bottom:20,
        backgroundColor:"#2563eb", borderRadius:50,
        paddingVertical:15, paddingHorizontal:20
    },
    addText:{ color:"#fff", fontSize:22, fontWeight:"bold" },
    filterRow:{ flexDirection:"row", gap:10, marginBottom:10 },
    filterBtn:{ paddingVertical:8, paddingHorizontal:14, borderRadius:8, backgroundColor:"#ddd" },
    filterActive:{ backgroundColor:"#2563eb" },
    filterText:{ fontSize:14, color:"#000" },
    filterTextActive:{ color:"#fff", fontWeight:"600" },
});
