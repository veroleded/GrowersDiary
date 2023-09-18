import EasyYandexS3 from 'easy-yandex-s3';

const s3 = new EasyYandexS3({
  auth: {
    accessKeyId: process.env.YA_CLOUD_ID as string,
    secretAccessKey: process.env.YA_CLOUD_SECRET_KEY as string,
  },
  Bucket:'growersdiary',
  debug: true, // потом удалить
});

export default s3;