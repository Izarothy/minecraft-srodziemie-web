const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).catch(console.log);
};

export default copyToClipboard;
