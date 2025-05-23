export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const API_URL = `${process.env.REACT_APP_FOG_SERVER_URL}/upload`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server responded with ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }
};
