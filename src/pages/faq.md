---
layout: ../../layouts/DocLayout.astro
title: "Frequently Asked Questions"
---

## How can I join the work of ISO/TC 211?

If you want to join the work of ISO/TC 211,
you must contact the [ISO member](https://www.iso.org/members.html) in your country.
Not all ISO members are members of ISO/TC 211.
To be involved directly in the work, your member body must be a participating member (P-member)
of ISO/TC 211.
See the [list of P-members](https://www.iso.org/committee/54904.html?view=participation).

The [ISO/TC 211 liaison members](https://www.iso.org/committee/54904.html#liaisons)
can also nominate experts to join the ISO/TC 211 work.

## How can I obtain the Standards from ISO/TC 211?

You can get the ISO/TC 211 standards through the [ISO member](https://www.iso.org/members.html)
in your country or through [ISO](https://www.iso.org).
Even if your country is not a member of ISO/TC 211, you can purchase ISO standards through them.

## How can I obtain documents issued by ISO/TC 211?

Only [ISO/TC 211 members or liaisons](https://www.iso.org/committee/54904.html)
have access to the ISO LiveLink which is a password protected area.

Different members may have different ways of accessing documents,
please contact the [ISO/TC 211 members or liaisons](https://www.iso.org/committee/54904.html)
directly for this information.

## Can I join the ISO/TC 211 meetings?

P-members, O-members and liaison members can attend the plenary meetings.
All delegates must be accredited by their member bodies (national or liaison).

To participate at the Working Group (WG) meetings and project team meetings,
you must be nominated as an expert to that group by a member body
(either P-member or liaison member).
If you are nominated to a project, you can join the meetings of this project
and the WG it belongs to without further accreditation.

In connection with the plenary meetings, a workshop is often arranged.
This workshop is normally open for interested parties in the host country.

## How can I easily find an overview of the ISO/TC 211 work?

The [programme of work](https://committee.iso.org/sites/tc211/home/projects.html)
lists all the active projects of ISO/TC 211
and gives information of which stage they presently are and the project leader/editor.
There is also a link on each project to a fact sheet describing the project closer.

## Why is an XML namespace URI not accessible?

The issue is that these are namespace URIs, not actual HTTP URLs.
For example, the XML schema for `http://www.isotc211.org/2005/gmd`
is located at https://www.isotc211.org/2005/gmd/gmd.xsd.

Those strings (`http://www.isotc211.org/2005/gcd`) are purely identifiers
(HTTP URIs, technically).
They do not necessarily resolve to a useful representation,
although it has become common practice to set them up so they do resolve to something.
They could equally well be UUID's or URNs.

Instead, the `schemaLocation` property is the one that binds the identifier
to a web location (URL) where the XML schema can be retrieved from.

XML specs do not require that a namespace formulated to look like a HTTP URI be resolvable.
An application *SHOULD NOT* depend on resolvability of a namespace URI.

> **Note**
> More of this discussion can be found here: https://github.com/ISO-TC211/www.isotc211.org/issues/15
