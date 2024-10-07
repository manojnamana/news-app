import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Appbar, Button, Chip, MD3Colors, ProgressBar, useTheme } from 'react-native-paper';
import { ComponentNavigationType, NewType } from '@/utils/types';
import CardItem from '@/components/CardItem';

const categories = ['Technology', 'Sports', 'Politics', 'Health', 'Business']
const API_KEY = 'pub_5522320f1960c2b55601a854033c9ff119af6'

const Home = (props:ComponentNavigationType) => {
  const theme = useTheme()
  const [selectCategories, setSelectCategories] = useState<string[]>([])
  const [newsData, setNewsData] = useState<NewType[]>([])
  const [nextPage, setNextPage] = useState<string>('')
  const [isLoading, setLoading] = useState(false)
  const handleSelect = (val: string) => {
    setSelectCategories((prev: string[]) => 
      prev.includes(val) ? prev.filter(category => category !== val) : [...prev, val]
    )
  }


  const handleRefresh = async () => {
    const URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=in&language=en${
      selectCategories.length > 0 ? `&category=${selectCategories.join()}` : '' 
    }${nextPage ? `&page=${nextPage}` : ''}`
    
    try {
      setLoading(true)
      const response = await fetch(URL)
      const data = await response.json()

      setNewsData(prev => [...prev, ...data.results])
      setNextPage(data.nextPage)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
    }finally{
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Home" />
      </Appbar.Header>

      <View style={styles.filterContainer}>
        {categories.map(category => (
          <Chip
            key={category}
            mode='outlined'
            style={styles.chipItem}
            textStyle={{ fontWeight: '400', padding: 1, color: 'white' }}
            showSelectedOverlay
            selected={selectCategories.includes(category)}
            onPress={() => handleSelect(category)}
          >
            {category}
          </Chip>
        ))}
        <Button 
          mode='outlined'
          style={styles.button}
          labelStyle={{ fontSize: 14, marginRight: 2, color: theme.colors.primary }}
          icon={'sync'}
          onPress={handleRefresh}
        >
          Refresh
        </Button>
      </View>

      {isLoading&&<ProgressBar
       visible={isLoading}
        indeterminate
         color={MD3Colors.error50}
          />}

      <FlatList
        keyExtractor={(item)=>item.title}
        onEndReached={handleRefresh}
        style={styles.flatList}
        data={newsData}
        renderItem={({ item }) => (
          <CardItem
           
            content={item.content}
            description={item.description}
            image_url={item.image_url}
            title={item.title} 
            navigation={props.navigation}                     />
        )}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  chipItem: {
    margin: 5,
  },
  button: {
    maxWidth: 400,
    padding: 0,
    maxHeight: 40,
    paddingRight: 14,
  },
  flatList: {
    flex: 1,
    height: 'auto',
  },
})
