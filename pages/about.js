import aboutStyle from '../styles/About.module.css'

const About = () => {
    return(
        < >
            <div className = {aboutStyle.about}>
                <h1 className = {aboutStyle.title}>About Us</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
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
                        <img className = {aboutStyle.img} src = "https://via.placeholder.com/250" alt = "Jimmy Picture"></img>
                    </div>
                    <p className = {aboutStyle.name}>Jimmy Lu</p>
                    <div className = {aboutStyle.bio}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula ligula eget tellus scelerisque dictum. Nunc quis imperdiet odio. Aliquam sollicitudin nisi vel ipsum bibendum commodo. Donec vel mauris et elit tempus ornare. Sed at venenatis odio, vel tempus purus. Aliquam erat volutpat. </p>
                    </div>
                </div>
            </div>
        </ >
    )
}

export default About;