import { Image, Text, View } from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <View className="w-full h-20 flex flex-row items-center">
      {/* Logo pinned left */}
      <Image
        source={require("../assets/Krux_full_logo.png")}
        className="left-0 w-40 h-20"
        resizeMode="contain"
      />

      {/* Centered tabs */}
      <View className="flex flex-row gap-10 px-10 items-center ">
        <Text className="text-white font-bold text-2xl">For You</Text>
        <View className="flex flex-row items-center">
          <Text className="text-white font-bold text-2xl pr-2">Friends</Text>
          <View className="flex flex-row">
            <View className="bg-gray-500 h-8 w-8 rounded-full" />
            <View className="bg-red-500 h-8 w-8 rounded-full -ml-4" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;