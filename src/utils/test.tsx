const createCourse = async () => {
  const payload = { name, courseCode, ...rest };
  const thumbnail = formdata.append("thumbnail");
  const trailer = FormData.append("trailer");
  const res = await axios.post(url, payload, config);
  const id = res.data.id;
  const uploadThumbnail = await axios.patch(
    `${url / id}`,
    thumbnailImg,
    config
  );
  const uploadTrailer = await axios.patch(`${url / id}`, trailerImg, config);
  clg(res.data.msg);
};
