window.onload = function () {
  const scriptUrl = "https://script.google.com/macros/s/AKfycbwq_WFaXcMVY-blobYCANmAGW6Ln8k_-z03AfxaOXM4JLoX0EY9PkmWX07mwCt6aE28/exec";

  async function fetchComments() {
    const res = await fetch(scriptUrl);
    const data = await res.json();
    const container = document.getElementById('comments');
    container.innerHTML = data.reverse().map(c =>
      `<p><strong>${c.name}</strong>: ${c.comment}</p>`).join('');
  }

  const form = document.getElementById('comment-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const comment = document.getElementById('comment').value;
      await fetch(scriptUrl, {
        method: 'POST',
        body: new URLSearchParams({ name, comment }),
      });
      form.reset();
      fetchComments();
    });
  }

  fetchComments();
};
