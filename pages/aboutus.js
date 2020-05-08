import aboutStyle from '../styles/About.module.css'

const About = () => {
    return(
        < >
            <div className = {aboutStyle.about}>
                <h1 className = {aboutStyle.title}>About Us</h1>
                <p>Our team is devoted to guaranteeing the health of individuals
                     during COVID-19. These circumstances call for an even greater
                     need to take care of our health, but it's important to do so 
                     on an everyday basis. Our application helps everyone to easily
                     find their individual requirements, but also to be able to
                     evaluate their meals and common snacks. Overcoming the need to 
                     find resources on different sites will also help users' willingness
                     to take care of their health. By taking care of our individual 
                     health and being aware of current circumstances, the
                     world will be able to overcome this pandemic sooner than later. 
                </p>
            </div>
            <h1 className = {aboutStyle.title}>Meet the Team</h1>
            <div className = {aboutStyle.team}>  
                <div className = {aboutStyle.member}>
                    <div className = {aboutStyle.picture}>
                        <img className = {aboutStyle.img} src = "https://via.placeholder.com/250" alt = "Ricky Picture"></img>
                    </div>
                    <p className = {aboutStyle.name}>Ricky Choi</p>
                    <div className = {aboutStyle.bio}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula ligula eget tellus scelerisque dictum. Nunc quis imperdiet odio. Aliquam sollicitudin nisi vel ipsum bibendum commodo. Donec vel mauris et elit tempus ornare. Sed at venenatis odio, vel tempus purus. Aliquam erat volutpat.</p>
                    </div>
                </div>  

                <div className = {aboutStyle.member}>
                    <div className = {aboutStyle.picture}>
                        <img className = {aboutStyle.img} src = "./images/brian_pic.jpg" alt = "Brian Picture"></img>
                    </div>
                    <p className = {aboutStyle.name}>Brian Seo</p>
                    <div className = {aboutStyle.bio}>
                        <p>Health is very important to Brian because his family has quite the medical history. Once COVID-19 became a worldwide pandemic, he wanted to make sure that he was taking care of himself and also finding a way to help others take care of their health. </p>
                    </div>
                </div>

                <div className = {aboutStyle.member}>
                    <div className = {aboutStyle.picture}>
                        <img className = {aboutStyle.img} src = "https://via.placeholder.com/250" alt = "Jason Picture"></img>
                    </div>
                    <p className = {aboutStyle.name}>Jason Cheung</p>
                    <div className = {aboutStyle.bio}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula ligula eget tellus scelerisque dictum. Nunc quis imperdiet odio. Aliquam sollicitudin nisi vel ipsum bibendum commodo. Donec vel mauris et elit tempus ornare. Sed at venenatis odio, vel tempus purus. Aliquam erat volutpat. </p>
                    </div>
                </div>

                <div className = {aboutStyle.member}>
                    <div className = {aboutStyle.picture}>
                        <img className = {aboutStyle.img} src = "./images/jimmy_pic.jpg" alt = "Jimmy Picture"></img>
                    </div>
                    <p className = {aboutStyle.name}>Jimmy Lu</p>
                    <div className = {aboutStyle.bio}>
                        <p>Safe food and good nutrition are important to every person. Eating a nutritious and balanced diet is one of the best ways to protect and promote good health. </p>
                    </div>
                </div>
            </div>
        </ >
    )
}

export default About;