import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
 import { TeamModel } from "../../Model/NbaModel";

import { styles } from './styles';
 
type Props = {
  data: TeamModel;
  onPress: () => void;
}
 
export function Card({ data, onPress }: Props) {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
 
  function togglePasswordIsVisible() {
    setPasswordIsVisible(prevState => !prevState);
  }
 
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={togglePasswordIsVisible}>
        <Text style={styles.destaque}>
            {data.abbreviation}
          </Text>
        {/* <MaterialIcons
          name={passwordIsVisible ? "visibility" : "visibility-off"}
          size={22}
          color="#888D97"
        /> */}
      </TouchableOpacity>
 
      <View style={styles.content}>
        <View>
          <Text style={styles.nome}>
            {data.fullName}
          </Text>
          <Text style={styles.text}>
            {data.division}: {data.city}
          </Text>
           <Text style={styles.text}>
            {data.conference}
          </Text>
        </View>
      </View>
 
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <MaterialIcons
          name="edit"
          size={22}
          color="#888D97"
        />
      </TouchableOpacity>
    </View>
  );
}
