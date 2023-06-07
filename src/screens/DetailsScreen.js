import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const DetailsScreen = ({ route }) => {
  const insets = useSafeAreaInsets();
  const navigation=useNavigation();
  const { users } = useSelector((state) => state.user);
  const [userDetails, setUserDetails] = useState({});
  
  useEffect(() => {
    setUserDetails(users.find(x => x.id === route.params.userid))
  }, [])

  return (
    <View style={styles.container}>
      <View style={{backgroundColor:'#15ae71',paddingTop:insets.top}}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Image source={{uri:'https://img.icons8.com/ios-glyphs/30/back.png'}} style={styles.backStyle}/>
        </TouchableOpacity>
      </View>
      <View style={styles.section1}>
        <Image source={{uri:userDetails?.avatar}} style={styles.avatarStyle}/>
      </View>
      <View style={styles.section2}>
        <View style={styles.txtView}>
          <Text style={{color:'grey'}}>Name</Text>
          <Text style={styles.detailText}>{userDetails?.first_name} {userDetails?.last_name}</Text>
        </View>
        <View style={styles.txtView}>
          <Text style={{color:'grey'}}>Email</Text>
          <Text style={styles.detailText}>{userDetails?.email}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
  },
  section1:{
    flex:0.35,
    backgroundColor:'#15ae71',
    justifyContent:'center',
    alignItems:'center'
  },
  section2:{
    flex:0.7,
    backgroundColor:'beige',
    alignItems:'center'
  },
  txtView:{
    backgroundColor:'white',
    width:'85%',
    paddingVertical:11,
    paddingHorizontal:10,
    borderRadius:12,
    marginTop:20
  },
  backStyle:{
    width:25,
    height:25,
    tintColor:'white',
    marginTop:15,
    marginLeft:10
  },
  avatarStyle:{
    width:130,
    height:130,
    borderRadius:65
  },
  detailText: {
    fontSize: 20,
  },
});

export default DetailsScreen;
