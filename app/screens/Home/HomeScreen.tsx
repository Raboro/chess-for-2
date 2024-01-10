import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import PressableButton from '../../components/primitives/PressableButton/PressableButton';
import { styles } from './HomeScreenStyle';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <PressableButton text='Start' onPress={() => navigation.navigate('Main' as never)} />
    </SafeAreaView>
  );
};

export default HomeScreen;
