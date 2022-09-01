import './App.css';
import { useState } from "react";
function App() {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return;

    const data = await fetch(`/.netlify/functions/mailchimp`, {
      method: "POST",
      body: JSON.stringify({ email })
    });
    const json = await data.json();

    console.log({ json })
    setText(json.message);
  }

  return (
    <div className="App">
      <h4>Get in touch</h4>
      <form onSubmit={ handleSubmit }>
        <input value={ email } onChange={ (e) => setEmail(e.target.value) } />
        { text }
        <button type="submit">CLICK ME !</button>

      </form>

    </div>
  );
}

export default App;
