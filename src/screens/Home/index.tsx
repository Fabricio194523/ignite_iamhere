import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { styles } from "./styles";
import { Participant } from "../../components/Participant";
import React, { useState } from "react";

export function Home() {
const [participants, setParticipants] = useState<string[]>([])
const [participantName, setParticipantsName] = useState('')
  
  function handleParticipantAdd() {
    if(participants.includes(participantName)){
     return  Alert.alert('Participante existe','Já exite um particpante na lista com esse nome')

    };

    setParticipants(prevState => [...prevState, participantName])
    setParticipantsName('');
  }

  function handleParticipantRemove(name: string) {
    Alert.alert('Remover', `Remover participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(Participant => Participant !== name))
      },
      {
        text: 'Não',
        style: "cancel"
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>Quarta , 5 de abril de 2023</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor={"#6b6b6b"}
          onChangeText={setParticipantsName}
          value={participantName}
        />
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguem chegou no evento ainda? Adicione participantes a sua lista de presença
          </Text>
        )}
      />
    </View>
  );
}
