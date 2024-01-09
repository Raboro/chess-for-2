import { useNavigation } from '@react-navigation/native';
import { Button, SafeAreaView } from 'react-native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Button
        title="Start"
        onPress={() => navigation.navigate('Main' as never)}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
