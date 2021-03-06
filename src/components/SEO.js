import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({childElements, title, description, metaImage, metaType, meta, useMailChimp, useCurator, useSharing, cannonical}) => {
	
	const { pathname } = useLocation()
	const { site } = useStaticQuery(query)
	const {
		defaultTitle,
		titleTemplate,
		defaultDescription,
		siteUrl,
		defaultImage,
		defaultLang,
		keywords,
		twitterUsername,
	} = site.siteMetadata
	
	const seo = {
		title: title || defaultTitle,
		description: description || defaultDescription,
		url: `${siteUrl}${pathname}`,
		
		// Open Graph Meta Tags
		metaImage: metaImage && metaImage.src ? `${siteUrl}${metaImage.src}` : `${siteUrl}${defaultImage}`,
		metaType: metaType,
	}
	
	return (
		<Helmet
		htmlAttributes={{
			lang: defaultLang,
		}}
		title={title}
		titleTemplate={titleTemplate}
		key="seo"
		meta={[
			{
				name: `description`,
				content: seo.description,
			},
			{
				name: "keywords",
				content: keywords.join(","),
			},
			{
				property: `og:title`,
				content: title,
			},
			{
				property: `og:description`,
				content: seo.description,
			},
			{
				property: `og:type`,
				content: seo.metaType,
			},
			{
				name: `twitter:creator`,
				content: twitterUsername,
			},
			{
				name: `twitter:title`,
				content: title,
			},
			{
				name: `twitter:description`,
				content: seo.description,
			},
		].concat(
			metaImage
			? [
				{
					property: "og:image",
					content: seo.metaImage.src,
				},
				{
					property: "og:image:width",
					content: metaImage.width,
				},
				{
					property: "og:image:height",
					content: metaImage.height,
				},
				{
					name: "twitter:card",
					content: "summary_large_image",
				},
			]
			: [
				{
					name: "twitter:card",
					content: "summary",
				},
			]
			).concat(meta)
		}
				
		link={[{
			rel: 'icon',
			href: '/favicon.ico',
		},
		{
			rel: 'canonical',
			href: cannonical ?? seo.url, 
		}]
	}
	>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
		{useCurator && <script type="text/javascript" src="https://cdn.curator.io/published/18d8088e-b13e-4fbe-a348-e56d6fcbf0a6.js"></script>}
		{useMailChimp && <script type="text/javascript" src="https://chimpstatic.com/mcjs-connected/js/users/c190e10f2b62c767274e1197b/52a4a6cc65ff988eefff98c51.js"></script>}
		{childElements}
	</Helmet>
	)
}

SEO.defaultProps = {
	childElements: [],
	meta: [],
	description: ``,
	metaImage: null,
	metaType: `website`,
	useMailChimp: false,
	useCurator: false,
	useSharing: false,
	cannonical: undefined, 
}

SEO.propTypes = {
	childElements: PropTypes.arrayOf(PropTypes.object), 
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	metaImage: PropTypes.shape({
		src: PropTypes.string,
		height: PropTypes.number,
		width: PropTypes.number,
	}),
	metaType: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object),
	useMailChimp: PropTypes.bool,
	useCurator: PropTypes.bool,
	useSharing: PropTypes.bool,
	cannonical: PropTypes.string,
}
export default SEO

const query = graphql`
query SEO {
	site {
		siteMetadata {
			defaultTitle: title
			author
			titleTemplate
			defaultDescription: description
			siteUrl: url
			defaultImage: image
			defaultLang: lang
			keywords
			twitterUsername
		}
	}
}
`