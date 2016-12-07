export default function (text: string, callback: (x: string) => void){
  const input = document.createElement('textarea');
  document.body.appendChild(input);
  input.value = text;
  input.focus();
  input.select();
  document.execCommand('Copy');
  input.remove();
  callback(text);
}