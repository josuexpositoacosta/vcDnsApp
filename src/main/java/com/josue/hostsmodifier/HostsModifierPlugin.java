package com.tu_usuario.hostsmodifier;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

@Plugin(name = "HostsModifier")
public class HostsModifierPlugin extends Plugin {

    @PluginMethod
    public void modifyHosts(PluginCall call) {
        String ip = call.getString("ip");
        String host = call.getString("host");

        try {
            HostsModifier.modifyHosts(ip, host);
            call.resolve();
        } catch (IOException e) {
            call.reject("Error modifying hosts file", e);
        }
    }
}