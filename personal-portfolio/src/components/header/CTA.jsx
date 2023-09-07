import CV from '../../Assets/cv.pdf'

function CTA() {
  return (
    <div className='cta'>
        <a href={CV} download className='btn'>Download Resume</a>
        <a href="#contact" className='btn btn-primary'>Contact me</a>
    </div>
  )
}

export default CTA