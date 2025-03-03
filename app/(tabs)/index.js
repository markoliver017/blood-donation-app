import { Link } from 'expo-router'
import React from 'react'
import { StatusBar, Text } from 'react-native'
import { View } from 'react-native'

export default function Page() {
  return (
    <View>
        <Link href="./" relativeToDirectory>
          Go to Home
        </Link>
        <Link href="./settings" relativeToDirectory>
          Go to Settings
        </Link>
    </View>
  )
}
