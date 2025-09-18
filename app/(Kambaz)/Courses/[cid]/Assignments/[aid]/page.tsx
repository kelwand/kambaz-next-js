export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name"> <strong> Assignment Name </strong></label>
            <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />

            <label htmlFor="wd-description">Description</label>
            <textarea id="wd-description" defaultValue= "The assignment is available online. Submit a link to the landing page of your your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page." rows={4}>
            </textarea> <br /><br />

            <table>
                <tbody>
                    <tr>
                        <td align="right" valign="top"><label htmlFor="wd-points">Points</label></td>
                        <td><input id="wd-points" type="number" defaultValue={100} /></td>
                    </tr>

                    <tr>
                        <td align="right" valign="top"><label htmlFor="wd-group">Assignment Group</label></td>
                        <td>
                            <select id="wd-group" defaultValue="ASSIGNMENTS">
                                <option>ASSIGNMENTS</option>
                                <option>QUIZZES</option>
                                <option>EXAMS</option>
                                <option>PROJECT</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td align="right" valign="top"><label htmlFor="wd-display-grade-as">Display Grade As</label></td>
                        <td>
                            <select id="wd-display-grade-as" defaultValue="Percentage">
                                <option>Points</option>
                                <option>Percentage</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td align="right" valign="top"><label htmlFor="wd-submission-type">Submission Type</label></td>
                        <td>
                            <select id="wd-submission-type" defaultValue="Online">
                                <option>Online</option>
                                <option>On Paper</option>
                                <option>No Submission</option>
                            </select>

                            <div style={{ marginTop: "8px" }}>
                                Online Entry Options
                            </div>

                            <div>
                                <input type="checkbox" id="wd-text-entry" /> <label htmlFor="wd-text-entry">Text Entry</label><br />
                                <input type="checkbox" id="wd-website-url" /> <label htmlFor="wd-website-url">Website URL</label><br />
                                <input type="checkbox" id="wd-media-recordings" /> <label htmlFor="wd-media-recordings">Media Recordings</label><br />
                                <input type="checkbox" id="wd-student-annotation" /> <label htmlFor="wd-student-annotation">Student Annotation</label><br />
                                <input type="checkbox" id="wd-file-upload" /> <label htmlFor="wd-file-upload">File Uploads</label>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-assign-to">Assign To</label>
                        </td>
                        <td>
                            <input
                                id="wd-assign-to"
                                type="text"
                                defaultValue="Everyone"
                                placeholder="Type to assign..."
                            />
                        </td>
                    </tr>

                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-due-date">Due</label>
                        </td>
                        <td>
                            <input id="wd-due-date" type="date" defaultValue="2024-05-13" />
                        </td>
                    </tr>
                    <tr>
                        <td align="right" valign="top">
                            <label htmlFor="wd-available-from">Available From</label>
                        </td>
                        <td>
                            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                <input
                                    id="wd-available-from"
                                    type="date"
                                    defaultValue="2024-05-06"
                                    style={{ width: "150px" }}
                                />
                                <label htmlFor="wd-available-until">Until</label>
                                <input
                                    id="wd-available-until"
                                    type="date"
                                    defaultValue="2024-05-20"
                                    style={{ width: "150px" }}
                                />
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>

            <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                <button>Cancel</button>
                <button>Save</button>
            </div>
        </div>
    );
}
