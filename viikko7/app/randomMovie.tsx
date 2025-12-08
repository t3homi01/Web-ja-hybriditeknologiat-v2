import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, View } from "react-native";

const API_KEY = ""; 

export default function RandomMovie() {
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function fetchMovie() {
    setLoading(true);
    setErrorMsg(null);

    try {
      // Hae lista jouluelokuvia
      const searchUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&s=christmas&type=movie`;
      const searchResponse = await fetch(searchUrl);
      const searchData = await searchResponse.json();

      if (!searchData.Search || searchData.Search.length === 0) {
        throw new Error("No Christmas movies found");
      }

      // Valitse satunnainen elokuva listasta
      const random = Math.floor(Math.random() * searchData.Search.length);
      const imdbID = searchData.Search[random].imdbID;

      const detailsUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`;
      const detailResponse = await fetch(detailsUrl);
      const movieDetails = await detailResponse.json();

      setMovie(movieDetails);
    } catch (error: any) {
      setErrorMsg(error.message);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchMovie();
  }, []);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#C41E3A" />
        <Text style={{ marginTop: 10 }}>Loading Christmas movie...</Text>
      </View>
    );

  if (errorMsg)
    return (
      <View style={styles.center}>
        <Text style={{ color: "red", marginBottom: 20 }}>{errorMsg}</Text>
        <Button title="Try Again" onPress={fetchMovie} />
      </View>
    );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {movie.Poster && movie.Poster !== "N/A" ? (
        <Image source={{ uri: movie.Poster }} style={styles.poster} />
      ) : (
        <Text>No poster available</Text>
      )}

      <Text style={styles.title}>{movie.Title}</Text>
      <Text style={styles.year}>({movie.Year})</Text>
      <Text style={styles.rating}>⭐ IMDb: {movie.imdbRating}</Text>

      <Text style={styles.plot}>{movie.Plot}</Text>

      <Button title="Pick Another Movie 🎄" onPress={fetchMovie} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  poster: {
    width: 250,
    height: 350,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: "cover",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  year: {
    fontSize: 18,
    color: "#666",
    marginBottom: 8,
  },
  rating: {
    fontSize: 20,
    marginBottom: 15,
  },
  plot: {
    fontSize: 16,
    textAlign: "center",
  },
});
