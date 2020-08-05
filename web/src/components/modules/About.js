import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Carousel } from 'react-responsive-carousel';
import audric from '../../assets/images/audric.png';
import justen from '../../assets/images/justen.png';

class About extends Component {
	render() {
		return (
			<div className="about page">
				<Helmet>
					<title>About</title>
					<meta name="description" content="Learn about CTBY and its founders." />
				</Helmet>
				<div className="container container--top-bottom-padding">
					<div className="row">
						<div className="col">
							<h1 className="text--lg">About</h1>
						</div>
					</div>
					<div className="row">
						<div className="col">
							<Carousel className="carousel-about" interval={5000} showStatus={false} showThumbs={false} showArrows={false} autoPlay={true} infiniteLoop={true}>
								<div key="slide1" className="carousel-about">
									<p className="text--sm">With a passion for health &amp; wellness, we realized how much our lives and
									those of others were impacted, mentally and physically, and we wanted to
									help people on a larger scale. We figured it would make sense to engage
									professionals (pros) who are just as, or even more, passionate about
									health &amp; wellness. With the concept of connecting clients with pros, Choose To Be You came to life.</p>
								</div>
								<div key="slide2" className="carousel-about">

									<p className="text--sm">People around the world struggle with obesity, stress, depression, lack of
									confidence, busy schedules...the list goes on. In response, we want to
									create a community of fun, health, fitness, positivity, happiness, and
									convenience. Our app will allow clients to experience this community and
									have access to a variety of fitness trainers, chefs, massage therapists,
									and nutritionists. Choose To Be You is for everyone ... "<strong>Work on being a better YOU</strong>."</p>
								</div>
							</Carousel>
						</div>
					</div>
				</div>

				<div className="page__quote">
					<div className="container container--small container--top-bottom-padding">
						<p className="text--center text--md">We’re on a mission to foster a GLOBAL community of health, positivity, motivation, and happiness in the next 5 years</p>
					</div>
				</div>

				<div className="container container--top-bottom-padding">
					<div className="row">
						<div className="col col--7">
							<div>
								<h2 className="text--md">Audric Smith</h2>
								<p><strong>Co-Founder, CEO</strong></p>
								<p>Audric Smith Co-Founder, CEO: Audric Smith is a Founder and Owner of Choose
								To Be You. He has always had a passion for health &amp; wellness, and discovered
								C2Byou to transfer this lifestyle to others and positively impact as many lives as
								possible. Audric received his Masters of Accounting degree from The Ohio State,
								and Bachelor of Science in Accounting from UNC Fayetteville State University. He
								also has a CPA license and is a Senior Manager at an accounting and financial
								consulting firm. Audric is also active in the community, contributing to organizations
								such as Big Brothers Big Sisters, Salvation Army, and Boys &amp; Girls Club, and
								Camillus House. Audric was born in Nassau, Bahamas and currently resides in
								Florida. When not occupied with the aforementioned activities, he is engaged in motivational speaking, self-education, and writing.</p>
							</div>
						</div>
						<div className="col col--5">
							<div>
								<img src={audric} alt={'Audric Smith'} />
							</div>
						</div>
					</div>
				</div>

				<div className="container container--top-bottom-padding">
					<div className="row">
						<div className="col col--7">
							<div>
								<h2 className="text--md">Justen Augustine</h2>
								<p><strong>Co-Founder, COO</strong></p>
								<p>Justen Augustine Co-Founder, COO: Justen Augustine is a Founder at Choose To
								Be You and directs strategic initiatives that concerns the company’s growth in the
								Health &amp; Wellness Industry. He has always been extremely passionate about health
								&amp; wellness since he was 15. Later, he discovered this opportunity, C2Byou, with his
								cousin, Audric Smith, to transfer his strong emotion into value, by helping others live
								a happier and healthier life. Justen has acquired his Personal Trainer Certification
								from ISSA. As an online wellness instructor, Justen has helped thousands of
								students and clients achieve their physical wellness goals. Justen was born in Florida
								and currently resides in New York. When he’s not working, he is engaged in
								exercise, self-education, and travel.</p>
							</div>
						</div>
						<div className="col col--5">
							<div>
								<img src={justen} alt={'Justen Augustine'} />
							</div>
						</div>
					</div>
				</div>

			</div>
		)
	}
}

export default About