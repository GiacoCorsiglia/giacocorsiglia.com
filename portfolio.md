# Portfolio

## FareHarbor

I have worked for three years as a software engineer and product designer at FareHarbor.  During this time, I contributed to numerous projects spanning multiple technologies and business areas.  Some highlights are listed here.

Most projects fit in our core application, written in JavaScript (Angular 1) and Python (Django).  I also wrote a significant amount of PHP, and dabbled with TypeScript.

FareHarbor offers reservation and accounting software alongside a suite of services designed to help tour and activity companies grow.  I worked in close collaboration with the rest of the product team, and especially its leaders, Bryan, Matt, and Zach.

### Timeline View

The Timeline View presents detailed inventory usage and availability over a given day.  It allows tour and activity operators to view their schedule at-a-glance, and provides an easy interface for booking new customers.

I received this project as a prototype and saw it through to completion, adding and refining features along the way.  Product challenges included packing in information while retaining usability, and the popover interface for interacting with individual blocks on the timeline.

Technical challenges included optimizing render performance, and both implementing and using the server api in a performant fashion.  Not to mention the CSS trickery that enables precisely positioned nodes to expand to an arbitrary height—and works in IE 10.

### Grid View

The Grid View provides a highly customizable schedule overview.  It supports organization across three axes (rows, columns, and groups), but retains the filtering functionality and the design of FareHarbor's existing monthly and daily agenda views.

Like the Timeline View, I took this project from a prototype to its production-ready form.   It posed similar challenges.  The Grid is now the default schedule view for all new FareHarbor clients.  I'm especially proud of the mobile version (which Bryan designed).

### FareHarbor Sites

FareHarbor Sites is a website hosting platform with highly flexible templates designed for tourism companies.  Helping clients expand their businesses is FareHarbor's prime directive, and FH Sites helps supercharge their online presence.

I joined FareHarbor to work on this project, which already hosted some 70 websites.  The existing templates were well-designed, but rigid, and could not keep up with the evolving needs of the growing client-base.  I reenvisioned them as a website builder supporting arbitrary organization of modular components.  I independently implemented this new feature set over several months, and continued to refine it.  FareHarbor Sites now powers nearly 700 websites.

FH Sites is built on WordPress.  The PHP code I wrote adheres strictly to object-oriented standards.  The platform handles over 1,000 requests per minute, and my custom page caching implementation keeps response time low.  I helped migrate FH Sites to a multi-server infrastructure on Amazon Web Services, writing Nginx configuration and an Ansible-based deploy playbook.

### Embed Generator

FareHarbor's website embeds power online booking for thousands of companies.  But our clients have businesses to run; they don't have time to learn our JavaScript API!  So, I helped build the Embed Generator, a GUI for configuring book button and calendar embeds.

### FareHarbor.com

I'm responsible for a good deal of the code—and some of the design direction—behind the public FareHarbor.com website.  FareHarbor offers a wide range of features and services.  The website seeks to guide new visitors to the things that interest them.  It additionally hosts the documentation center for existing clients.

The FareHarbor website is translated in multiple languages and localized for several countries.  I implemented the logic which enables this.

### Other projects

Like the website, the FareHarbor application is also internationalized.  I helped add support for translation as well as localized date, number, and currency formatting.

I was also involved in several projects adding new ways to take or record payment in the application.

As mentioned above, FareHarbor's JavaScript API powers embeds on tens of thousands of webpages.  I made several additions to this API, including the ability to maintain a consistent shopping cart state across multiple third-party iframes and page refreshes.

## FareHarbor

Things I worked on:

- Portion Calculator
- **Embed Generator**
- AutoLightframe
- Gift Card UI
- Analytics Services
- Assorted Mixpanel stuff
- **Grid View**
- Price sheet overview page
- Cart persistence
- Localization: datetime, number, currency
- Admin company notes
- TypeScript integration
- Dashboard colors
- Nags
- **Timeline**
- Affiliate in-store payment types
- AMOR
- Translation
- EMV Stuff

## FareHarbor Sites

Like, the whole thing.  70 sites -> 700 sites.

- Product design
- WordPress abstraction framework
- Caching implementation
- DevOps
    - Ansible-based deploy playbook
    - AWS ELB, EC2
    - Nginx config
    - PHP config
- Background tasks system
- Lead a team of 3 engineers/designer

## Content

- Redesign
- Auth system
- Translation
