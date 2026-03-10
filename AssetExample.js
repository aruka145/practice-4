import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
} from 'react-native';

// ДАННЫЕ В ТОМ ЖЕ ФАЙЛЕ
const PLACES = [
  {
    id: 1,
    name: "Кёнбоккун",
    category: "Достопримечательности",
    description: "Главный королевский дворец эпохи Чосон, построенный в 1395 году. Самый большой и красивый из пяти дворцов Сеула.",
    image: "https://avatars.mds.yandex.net/get-entity_search/6276884/1193833912/S600xU_2x",
    rating: 4.8,
    address: "161 Sajik-ro, Jongno-gu, Seoul",
    hours: "9:00 - 18:00",
    price: "₩3,000"
  },
  {
    id: 2,
    name: "N-Сеул Тауэр",
    category: "Достопримечательности",
    description: "Телевизионная башня высотой 236 метров на горе Намсан. Панорамный вид на весь Сеул, особенно красив вечером.",
    image: "https://cdn.getyourguide.com/img/location/5b45cac29bcf1.jpeg/99.jpg",
    rating: 4.7,
    address: "105 Namsangongwon-gil, Yongsan-gu, Seoul",
    hours: "10:00 - 23:00",
    price: "₩16,000"
  },
  {
    id: 3,
    name: "Лотте Ворлд",
    category: "Развлечения",
    description: "Крупнейший в мире крытый тематический парк с американскими горками, каруселями, ледовым катком и аквариумом.",
    image: "https://res.klook.com/image/upload/fl_lossy.progressive,q_85/c_fill,w_1000/v1700893698/wau03k37zpnroj0wbby5.jpg",
    rating: 4.6,
    address: "240 Olympic-ro, Songpa-gu, Seoul",
    hours: "10:00 - 22:00",
    price: "₩62,000"
  },
  {
    id: 4,
    name: "Мёндон",
    category: "Шопинг",
    description: "Главный торговый район Сеула с сотнями косметических магазинов, бутиков и лучшей уличной едой в городе.",
    image: "https://avatars.mds.yandex.net/i?id=58477a4dde49da801b3c13df12d32c10_l-7757532-images-thumbs&n=13",
    rating: 4.5,
    address: "Myeongdong-gil, Jung-gu, Seoul",
    hours: "10:00 - 22:00",
    price: "₩₩ (средние цены)"
  },
  {
    id: 5,
    name: "Букчон Ханок",
    category: "Культура",
    description: "Традиционная корейская деревня с домами ханок 600-летней давности. Сохранила атмосферу эпохи Чосон.",
    image: "https://i.ytimg.com/vi/bPvwisI9Q58/maxresdefault.jpg",
    rating: 4.4,
    address: "37, Bukchon-ro 11-gil, Jongno-gu, Seoul",
    hours: "Круглосуточно",
    price: "Бесплатно"
  },
  {
    id: 6,
    name: "Ханган Парк",
    category: "Парки",
    description: "Парк вдоль реки Ханган длиной 40 км. Место для пикников, велоспорта, пробежек и водных развлечений.",
    image: "https://cf.creatrip.com/original/blog/2412/70xuh9m1ajfgrjhi8c4wc77nktb5pcxs.png",
    rating: 4.3,
    address: "330 Yeouidong-ro, Yeongdeungpo-gu, Seoul",
    hours: "Круглосуточно",
    price: "Бесплатно"
  },
];

const CATEGORIES = ["Все", "Достопримечательности", "Развлечения", "Шопинг", "Культура", "Парки"];

// ГЛАВНЫЙ КОМПОНЕНТ
export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Фильтруем места
  const filteredPlaces = selectedCategory === "Все" 
    ? PLACES 
    : PLACES.filter(place => place.category === selectedCategory);

  // Открыть детали места
  const openPlaceDetails = (place) => {
    setSelectedPlace(place);
    setModalVisible(true);
  };

  // Закрыть детали
  const closePlaceDetails = () => {
    setModalVisible(false);
    setSelectedPlace(null);
  };

  // Рендер карточки места
  const renderPlaceCard = ({ item }) => (
    <TouchableOpacity style={styles.placeCard} onPress={() => openPlaceDetails(item)}>
      <Image source={{ uri: item.image }} style={styles.placeImage} />
      <View style={styles.placeInfo}>
        <Text style={styles.placeName}>{item.name}</Text>
        <View style={styles.row}>
          <Text style={styles.placeCategory}>{item.category}</Text>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
        </View>
        <Text style={styles.address} numberOfLines={1}>📍 {item.address}</Text>
        <View style={styles.row}>
          <Text style={styles.hours}>🕐 {item.hours}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* ШАПКА */}
      <View style={styles.header}>
        <Text style={styles.title}>🇰🇷 Сеул Гид</Text>
        <Text style={styles.subtitle}>Куда сходить в Сеуле</Text>
      </View>

      {/* КАТЕГОРИИ */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
      >
        {CATEGORIES.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.categoryTextActive
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* СПИСОК МЕСТ */}
      <FlatList
        data={filteredPlaces}
        keyExtractor={item => item.id.toString()}
        renderItem={renderPlaceCard}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>В этой категории пока нет мест</Text>
          </View>
        }
      />

      {/* МОДАЛЬНОЕ ОКНО С ДЕТАЛЯМИ */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closePlaceDetails}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedPlace && (
              <>
                {/* Кнопка закрытия */}
                <TouchableOpacity style={styles.closeButton} onPress={closePlaceDetails}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>

                {/* Изображение */}
                <Image source={{ uri: selectedPlace.image }} style={styles.modalImage} />
                
                {/* Контент */}
                <ScrollView style={styles.modalScroll}>
                  <Text style={styles.modalTitle}>{selectedPlace.name}</Text>
                  
                  <View style={styles.modalMeta}>
                    <View style={styles.modalCategory}>
                      <Text style={styles.modalCategoryText}>{selectedPlace.category}</Text>
                    </View>
                    <View style={styles.modalRating}>
                      <Text style={styles.modalRatingText}>⭐ {selectedPlace.rating}/5.0</Text>
                    </View>
                  </View>

                  {/* Информация */}
                  <View style={styles.infoBox}>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>📍 Адрес:</Text>
                      <Text style={styles.infoValue}>{selectedPlace.address}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>🕐 Часы работы:</Text>
                      <Text style={styles.infoValue}>{selectedPlace.hours}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>💰 Цена:</Text>
                      <Text style={styles.infoValue}>{selectedPlace.price}</Text>
                    </View>
                  </View>

                  {/* Описание */}
                  <Text style={styles.modalDescription}>{selectedPlace.description}</Text>
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* ФУТЕР */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 Seoul Guide • {PLACES.length} мест</Text>
      </View>
    </SafeAreaView>
  );
}

// СТИЛИ
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  // Шапка
  header: {
    padding: 25,
    backgroundColor: '#cd2e3a',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.9,
  },
  // Категории
  categoriesScroll: {
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryButton: {
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  categoryButtonActive: {
    backgroundColor: '#cd2e3a',
  },
  categoryText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // Список мест
  listContent: {
    padding: 15,
    paddingBottom: 80, // Чтобы не перекрывалось футером
  },
  placeCard: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  placeImage: {
    width: '100%',
    height: 180,
  },
  placeInfo: {
    padding: 15,
  },
  placeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  placeCategory: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    fontSize: 16,
    color: '#ff9500',
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },
  hours: {
    fontSize: 14,
    color: '#555',
  },
  price: {
    fontSize: 16,
    color: '#cd2e3a',
    fontWeight: 'bold',
  },
  // Пустой список
  empty: {
    padding: 50,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
  },
  // Модальное окно
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: '85%',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalImage: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  modalScroll: {
    padding: 25,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  modalMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalCategory: {
    backgroundColor: '#0047a0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  modalCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalRating: {
    backgroundColor: '#fff4e6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ff9500',
  },
  modalRatingText: {
    color: '#ff9500',
    fontWeight: 'bold',
    fontSize: 18,
  },
  // Информация
  infoBox: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    width: 100,
  },
  infoValue: {
    fontSize: 16,
    color: '#555',
    flex: 1,
  },
  modalDescription: {
    fontSize: 18,
    lineHeight: 28,
    color: '#444',
    marginBottom: 30,
  },
  // Футер
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
});