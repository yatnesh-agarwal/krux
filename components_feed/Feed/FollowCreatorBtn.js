import { Image, Pressable, Text, View } from 'react-native'
import React from 'react'
import { BadgeCheckIcon, EighthNotes } from 'lucide-react-native'

const FollowCreatorBtn = () => {
  const creatorAcc = [
    {
      accName: "Krux",
      logo: require('../../assets/Krux_logo_app.png'),
      isAccverfied: true,
      title: "Can you solve this?🤔",
      musicName: "Krux",
      music: "Original Audio",
      isAccFollowed: false
    }
  ]
  return (
    <View className = "flex-col gap-2 items-start pb-4">
      <View className = "flex-row items-center gap-2">
        <View className = "w-10 h-10 rounded-full border-2 border-[#A6E34A] overflow-hidden">
          <Image source = {creatorAcc[0].logo} className = "w-full h-full" resizeMode='cover' />
        </View>
        <Text className = "text-white font-bold text-xl">{creatorAcc[0].accName}</Text>
        {creatorAcc[0].isAccverfied ? <BadgeCheckIcon color="#000000" fill="white" size={20} /> : ""}
        <View className = "border border-white/20 py-2 px-4 rounded-3xl bg-black/20">
          <Pressable>
            <Text className = "text-white ">Follow</Text>
          </Pressable>
        </View>
      </View>
      <Text className = "text-white">{creatorAcc[0].title}</Text>
      <View className = "flex-row items-center gap-2 self-start border border-white/40 rounded-3xl p-2">
        <EighthNotes color="white" size={14} strokeWidth={4}  />
        <Text className = "text-white">{creatorAcc[0].musicName}</Text>
        <Text className = "text-white">•</Text>
        <Text className = "text-white">{creatorAcc[0].music}</Text>
      </View>
    </View>
  )
}

export default FollowCreatorBtn
