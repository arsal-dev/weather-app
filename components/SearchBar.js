import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useState } from "react";

const SearchBar = (props) => { 

    const [ cityName, setCityName ] = useState('');

    function TextHandler(text){
        setCityName(text);
    }

    function selectName(){
        props.newName(cityName);
    }

    return ( 
        <View style={styles.search}>
            <TextInput placeholder="Search Your City" onChangeText={TextHandler} />
            <Feather name="search" size={24} color="white" onPress={selectName} />
        </View>
     );
}
 
export default SearchBar;

const styles = StyleSheet.create({
    search: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 200,
        borderWidth: 1.5,
        borderColor: 'white',
        width: Dimensions.get('screen').width -80,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#F5F5F5'
    },
});