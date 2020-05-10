// aboutus.js   
 
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
                        <img className = {aboutStyle.img} src = "./images/ricky_pic.jpg" alt = "Ricky Picture"></img>
                    </div>
                    <p className = {aboutStyle.name}>Ricky Choi</p>
                    <div className = {aboutStyle.bio}>
                        <p>In this unexpected crisis of COVID-19, Ricky values well-organized eating habits and balanced nutrition intake. During this season, it is important to eat healthy and stay balanced to maximize your body immune system.</p>
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
                        <img className = {aboutStyle.img} src = "./images/jason_pic.jpg" alt = "Jason Picture"></img>
                    </div>
                    <p className = {aboutStyle.name}>Jason Cheung</p>
                    <div className = {aboutStyle.bio}>
                        <p>Jason wants to make sure people are aware of the importance of nutrition and healthy foods. During the COVID-19 pandemic, one of the best ways to protect your physical and mental wellbeing is to take care of your health with a nutritious diet. </p>
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