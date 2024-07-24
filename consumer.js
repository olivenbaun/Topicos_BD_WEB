const { Kafka } = require('kafkajs');

// Configuração do Kafka
const kafka = new Kafka({
  clientId: 'youtube-comment-consumer',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({
  groupId: 'youtube-comments-group',
  topic: 'youtube-comments',
});

(async () => {
  await consumer.connect();
  await consumer.subscribe();

  consumer.on('message', (message) => {
    const comment = JSON.parse(message.value);
    console.log(`Comentário recebido: ${comment.snippet.text}`);

    // Processamento dos comentários
  });
})();
