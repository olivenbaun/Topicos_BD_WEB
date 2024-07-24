const { Kafka } = require('kafkajs');
const { google } = require('@google/youtube');

// Configure o YouTube Data API
const youtube = google.youtube({
  version: 'v3',
  auth: {
    // Insira suas credenciais do YouTube Data API aqui
    key: 'YOUR_API_KEY',
  },
});

// Configuração do Kafka
const kafka = new Kafka({
  clientId: 'youtube-comment-producer',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

(async () => {
  await producer.connect();

  // Inserir ID do vídeo aqui
  const videoId = 'VIDEO_ID';

  // Comentários do vídeo
  const response = await youtube.videos.list({
    part: 'snippet',
    id: videoId,
    maxResults: 50,
  });

  const comments = response.data.items[0].snippet.topLevelComments;

  // Envio de cada comentário do vídeo para o tópico do Kafka
  for (const comment of comments) {
    await producer.send({
      topic: 'youtube-comments',
      messages: [
        {
          value: JSON.stringify(comment),
        },
      ],
    });
  }

  console.log('Comentários enviados com sucesso para o Kafka!');

  await producer.disconnect();
})();
