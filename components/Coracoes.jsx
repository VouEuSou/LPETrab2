export default function Coracoes({ soma, num }) {
  const media = parseFloat(soma / num)

  const coracoes = []

  for (let i = 1; i <= parseInt(media); i++) {
    coracoes.push(
      <i className="bi bi-heart-fill"></i>)
  }

  const decimos = media % 1
  if (decimos >= 0.25 && decimos <= 0.75) {
    coracoes.push(
      <i className="bi bi-heart-half"></i>
    )
  } else if (decimos > 0.75) {
    coracoes.push(
      <i className="bi bi-heart-fill"></i>)
  }
  for (let i = 0; i < 4 - parseInt(media); i++) {
    coracoes.push(
      <i className="bi bi-heart"></i>)
  }

  if (media === 1) {
    coracoes.push(
      <i className="bi bi-heart"></i>)
  }

  return (
    <div className="float-heart fs-5">
      {coracoes}
    </div>
  )
}