
import { ChartNoAxesColumn,House,  Play, Swords, User } from 'lucide-react-native';
import React from 'react';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

const Footer = () => {
  const [selectedBtn, setSelectedBtn] = useState(2);
  const btns = [
      { title: 'Home', icon: House },
      { title: 'Duels', icon: Swords },
      { title: 'Play', icon: Play },
    { title: 'Ranking', icon: ChartNoAxesColumn },
    { title: 'Profile', icon: User }
  ];

  return (
    <View className="w-full flex-row justify-between items-center border-t border-white/20 rounded-lg"
    style={{
        paddingHorizontal: 20,
        paddingVertical: 12,
    }}
    >

      {btns.map((i, idx) => {
        const Icon = i.icon;
        const isSelected = selectedBtn === idx;
        const color = isSelected ? "#A6E34A" : "white"

        return (
          <Pressable
            key={idx}
            className="flex-1 items-center justify-center gap-1"
            onPress={() => setSelectedBtn(idx)}
          >
            <Icon color={color} strokeWidth={1.5} fill = {isSelected ? color : ""} size={24} />

            <Text className={`${isSelected ? "text-[#A6E34A]" : "text-white"} font-medium text-sm `}>
              {i.title}
            </Text>
          </Pressable>
        );
      })}

    </View>
  );
};

export default Footer;
