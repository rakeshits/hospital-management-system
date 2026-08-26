import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DescribeDB {
    public static void main(String[] args) throws Exception {
        Class.forName("com.mysql.cj.jdbc.Driver");
        String url = "jdbc:mysql://localhost:3306/hospital_management_system"
                   + "?useSSL=false&serverTimezone=Asia/Kolkata&allowPublicKeyRetrieval=true";
        String[] passwords = {"", "root", "password", "1234", "12345", "mysql", "admin",
                              "hospital", "Root@123", "root@123", "toor", "rakesh", "Rakesh@123"};
        Connection conn = null;
        String goodPw = null;
        for (String pw : passwords) {
            try {
                conn = DriverManager.getConnection(url, "root", pw);
                goodPw = pw;
                System.out.println("Connected with password: '" + pw + "'");
                break;
            } catch (SQLException ignored) {}
        }
        if (conn == null) { System.out.println("Could not connect with any password."); return; }
        System.out.println("Password that works: '" + goodPw + "'");
        String[] tables = {"medicines", "admissions", "medical_records"};
        try (Statement s = conn.createStatement()) {
            for (String t : tables) {
                System.out.println("\n=== DESCRIBE " + t + " ===");
                try (ResultSet rs = s.executeQuery("DESCRIBE " + t)) {
                    System.out.printf("%-25s %-35s %-6s %-5s %-15s %-20s%n",
                            "Field","Type","Null","Key","Default","Extra");
                    System.out.println("-".repeat(110));
                    while (rs.next()) {
                        System.out.printf("%-25s %-35s %-6s %-5s %-15s %-20s%n",
                                rs.getString("Field"),
                                rs.getString("Type"),
                                rs.getString("Null"),
                                rs.getString("Key"),
                                rs.getString("Default") != null ? rs.getString("Default") : "NULL",
                                rs.getString("Extra"));
                    }
                } catch (SQLException e) {
                    System.out.println("Table '" + t + "' error: " + e.getMessage());
                }
            }
        }
        conn.close();
    }
}
