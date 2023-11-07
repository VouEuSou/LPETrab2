export default function Estrelas({ soma, num }) {
  const media = parseFloat(soma / num)

  const estrelas = []

  for (let i = 1; i <= parseInt(media); i++) {
    estrelas.push(
      <i className="bi bi-heart-fill"></i>)
  }

  const decimos = media % 1
  if (decimos >= 0.25 && decimos <= 0.75) {
    estrelas.push(
      <i className="bi bi-heart-half"></i>
    )
  } else if (decimos > 0.75) {
    estrelas.push(
      <i className="bi bi-heart-fill"></i>)
  }
  for (let i = 0; i < 4 - parseInt(media); i++) {
    estrelas.push(
      <i className="bi bi-heart"></i>)
  }

  if (media === 1) {
    estrelas.push(
      <i className="bi bi-heart"></i>)
  }

  return (
    <div className="float-heart fs-5">
      {estrelas}
    </div>
  )
}