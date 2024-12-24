package com.josue.hostsmodifier;

import android.content.Context;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class HostsModifier {

    public static void modifyHosts(String ip, String host) throws IOException {
        File hostsFile = new File("/system/etc/hosts");
        FileWriter writer = new FileWriter(hostsFile, true);
        writer.append(ip + " " + host + "\n");
        writer.flush();
        writer.close();
    }
}