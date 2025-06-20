import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica', 
  },
  section: {
    marginBottom: 15,
    paddingBottom: 5,
  },
  headerSection: {
    textAlign: 'center',
    marginBottom: 20,
  },
  fullName: {
    fontSize: 24,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  contactInfo: {
    fontSize: 10,
    color: '#555',
  },
  contactLink: {
    color: '#007bff',
    textDecoration: 'none',
  },
  heading: {
    fontSize: 14,
    color: '#2c3e50',
    borderBottomWidth: 2,
    borderBottomColor: '#61dafb',
    paddingBottom: 3,
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 2,
  },
  subInfo: {
    fontSize: 10,
    color: '#777',
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 11,
    marginBottom: 5,
  },
  listItem: {
    fontSize: 10.5,
    marginBottom: 2,
  },
  bulletPoint: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#333',
    marginRight: 6,
    marginTop: 4, 
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  skillsGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillCategory: {
    fontSize: 10.5,
    marginBottom: 5,
  }
});

const BulletListItem = ({ children }) => (
  <View style={styles.listContainer}>
    <View style={styles.bulletPoint} />
    <Text style={styles.listItem}>{children}</Text>
  </View>
);

const ResumePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.fullName}>{data.personalDetails?.fullName || 'Your Name'}</Text>
        <Text style={styles.contactInfo}>
          {data.personalDetails?.email && `${data.personalDetails.email} | `}
          {data.personalDetails?.phone && `${data.personalDetails.phone} | `}
          {data.personalDetails?.linkedin && <Link src={data.personalDetails.linkedin} style={styles.contactLink}>LinkedIn</Link>}
          {data.personalDetails?.github && ` | `}
          {data.personalDetails?.github && <Link src={data.personalDetails.github} style={styles.contactLink}>GitHub</Link>}
          {data.personalDetails?.portfolio && ` | `}
          {data.personalDetails?.portfolio && <Link src={data.personalDetails.portfolio} style={styles.contactLink}>Portfolio</Link>}
          {data.personalDetails?.address && ` | ${data.personalDetails.address}`}
        </Text>
      </View>

      {/* Summary */}
      {data.summary && data.summary.trim() && (
        <View style={styles.section}>
          <Text style={styles.heading}>Summary</Text>
          <Text style={styles.paragraph}>{data.summary}</Text>
        </View>
      )}

      {/* Work Experience */}
      {data.workExperience && data.workExperience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.heading}>Work Experience</Text>
          {data.workExperience.map((exp, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={styles.subHeading}>{exp.jobTitle} at {exp.company}</Text>
              <Text style={styles.subInfo}>{exp.location} | {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}</Text>
              {exp.responsibilities && exp.responsibilities.filter(r => r.trim()).map((resp, rIndex) => (
                <BulletListItem key={rIndex}>{resp}</BulletListItem>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.heading}>Education</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={styles.subHeading}>{edu.degree} {edu.major && `in ${edu.major}`}</Text>
              <Text style={styles.subInfo}>{edu.institution} | {edu.startDate} - {edu.endDate}</Text>
              {edu.gpa && <Text style={styles.subInfo}>GPA: {edu.gpa}</Text>}
              {edu.description && edu.description.trim() && <Text style={styles.paragraph}>{edu.description}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.heading}>Skills</Text>
          <View style={styles.skillsGrid}>
            {data.skills.map((skillCat, index) => (
              skillCat.category.trim() && skillCat.items && skillCat.items.length > 0 && skillCat.items.some(item => item.trim()) && (
                <Text key={index} style={styles.skillCategory}>
                  <Text style={{ fontWeight: 'bold' }}>{skillCat.category}:</Text> {skillCat.items.filter(item => item.trim()).join(', ')}
                </Text>
              )
            ))}
          </View>
        </View>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.heading}>Projects</Text>
          {data.projects.map((proj, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={styles.subHeading}>{proj.projectName}</Text>
              <Text style={styles.subInfo}>{proj.startDate} - {proj.endDate}</Text>
              {proj.description && proj.description.trim() && <Text style={styles.paragraph}>{proj.description}</Text>}
              {proj.technologies && proj.technologies.trim() && <Text style={styles.paragraph}><Text style={{ fontWeight: 'bold' }}>Technologies:</Text> {proj.technologies}</Text>}
              {proj.projectUrl && proj.projectUrl.trim() && <Link src={proj.projectUrl} style={styles.contactLink}>{proj.projectUrl}</Link>}
            </View>
          ))}
        </View>
      )}

      {/* Other Sections */}
      {((data.awards && data.awards.length > 0) ||
        (data.languages && data.languages.length > 0) ||
        (data.certifications && data.certifications.length > 0)) && (
        <View style={styles.section}>
          <Text style={styles.heading}>Additional Information</Text>
          {data.awards && data.awards.length > 0 && data.awards.some(item => item.trim()) && (
            <View style={{ marginBottom: 5 }}>
              <Text style={styles.subHeading}>Awards:</Text>
              {data.awards.filter(award => award.trim()).map((award, index) => (
                <BulletListItem key={index}>{award}</BulletListItem>
              ))}
            </View>
          )}
          {data.languages && data.languages.length > 0 && data.languages.some(item => item.trim()) && (
            <View style={{ marginBottom: 5 }}>
              <Text style={styles.subHeading}>Languages:</Text>
              {data.languages.filter(lang => lang.trim()).map((lang, index) => (
                <BulletListItem key={index}>{lang}</BulletListItem>
              ))}
            </View>
          )}
          {data.certifications && data.certifications.length > 0 && data.certifications.some(item => item.trim()) && (
            <View style={{ marginBottom: 5 }}>
              <Text style={styles.subHeading}>Certifications:</Text>
              {data.certifications.filter(cert => cert.trim()).map((cert, index) => (
                <BulletListItem key={index}>{cert}</BulletListItem>
              ))}
            </View>
          )}
        </View>
      )}

    </Page>
  </Document>
);

export default ResumePDF;