document.querySelectorAll('.complete-button').forEach((button) => {
  button.addEventListener('click', completeOrder)
})

function completeOrder(event) {
  const clickedElement = event.target
  const orderId = clickedElement.dataset.id

  fetch('/orders', {
    method: 'PUT',
    body: JSON.stringify({ id: orderId }),
    headers: { 'Content-Type': 'application/json'}
  }).then(() => window.location.reload())
}

document.querySelectorAll('.delete-button').forEach((button) => {
  button.addEventListener('click', deleteOrder)
})

function deleteOrder(event) {
  const clickedElement = event.target
  const orderId = clickedElement.dataset.id

  fetch('/orders', {
    method: 'DELETE',
    body: JSON.stringify({ id: orderId }),
    headers: { 'Content-Type': 'application/json'}
  }).then(() => window.location.reload())
}
