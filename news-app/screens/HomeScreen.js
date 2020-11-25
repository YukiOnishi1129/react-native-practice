import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList, SafeAreaView } from 'react-native'
import ListItem from '../components/ListItem'
import Constants from 'expo-constants'
import axios from 'axios'
import Loading from '../components/Loading'

const URL = `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${Constants.manifest.extra.newsApiKey}`
// const URL = `https://asia-northeast1-news-app-udemy.cloudfunctions.net/dummy_news`

export default HomeScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    setLoading(true)
    try {
      const response = await axios.get(URL)
      setArticles(response.data.articles)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <ListItem
            imageUrl={item.urlToImage}
            title={item.title}
            author={item.author}
            onPress={() =>
              navigation.navigate('Article', {
                article: item,
              })
            }
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {loading && <Loading />}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
